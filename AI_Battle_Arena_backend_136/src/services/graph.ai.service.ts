import { HumanMessage } from "@langchain/core/messages";
import { StateSchema, MessagesValue, StateGraph, START, END, type GraphNode, ReducedValue } from "@langchain/langgraph";
import { z } from "zod";
import { mistralModel, cohereModel, geminiModel } from "./model.service.js";
import { createAgent, providerStrategy } from "langchain";

// const state: AIBATTLESTATE = {
//     problem: ""
//     solution_1: "",
//     solution_2: "",
//     judge_recommendation: {
//         solution_1_score: 0,
//         solution_2_score: 0, 
//         solution_1_reasoning:""
//         solution_2_reasoning:""
//     }
// }

const state = new StateSchema({
    problem: z.string().default(""),
    solution_1: z.string().default(""),
    solution_2: z.string().default(""),
    judge_recommendation:
        z.object({
            solution_1_score: z.number().default(0),
            solution_2_score: z.number().default(0),
            solution_1_resoning: z.string().default(""),
            solution_2_resoning: z.string().default(""),
        }),
});

const solutionNode: GraphNode<typeof state> = async (state) => {
    // console.log(state)

    const [mistral_solution, cohere_solution] = await Promise.all([
        mistralModel.invoke(state.problem),
        cohereModel.invoke(state.problem),
    ]);


    return {
        solution_1: mistral_solution.text,
        solution_2: cohere_solution.text,
    };
};

const judgeNode: GraphNode<typeof state> = async (state) => {

    const { problem, solution_1, solution_2 } = state;

    const judge = createAgent({
        model: geminiModel,
        responseFormat: providerStrategy(z.object({
            solution_1_score: z.number().min(0).max(10),
            solution_2_score: z.number().min(0).max(10),
            solution_1_resoning: z.string(),
            solution_2_resoning: z.string()
        })),
        systemPrompt: `You are a judge tasked with evaluating the quality of two solutions to a problem. You will be given a problem statement and two solutions. Your task is to provide a score between 0 and 10 for each solution, where 0 is the worst and 10 is the best. Additionally, you should provide reasoning for the scores you assign to each solution. Your response should be in the following format:`
    })

    const judgeResponse = await judge.invoke({
        messages: [
            new HumanMessage(
                `Problem: ${problem}
                 Solution 1: ${solution_1}
                 Solution 2: ${solution_2}
                 Please evaluate the two solutions and provide your scores and reasoning.
                `
            )
        ]
    })
    const result = judgeResponse.structuredResponse

    // console.log("Helelo this is ur result ",result)

    return {
        judge_recommendation: result
    }
};

const graph = new StateGraph(state)
    .addNode("solution", solutionNode)
    .addNode("judge", judgeNode)
    .addEdge(START, "solution")
    .addEdge("solution", "judge")
    .addEdge("judge", END)
    .compile();

export default async function (userMessage: string) {
    const result = await graph.invoke({
        problem: userMessage
    });
    console.log(result);
    return result;
}
