import { google } from "@ai-sdk/google";
import { anthropic } from "@ai-sdk/anthropic";
import { openai, createOpenAI } from "@ai-sdk/openai";
import type { LanguageModel } from "ai";
// Choix du fournisseur selon la clé présente (ordre : Google, Anthropic, OpenAI, sinon AI Gateway).
export function getModel():LanguageModel{
  const e=process.env, forced=e.AI_PROVIDER;
  if((forced==="groq"||!forced)&&e.GROQ_API_KEY) return createOpenAI({baseURL:"https://api.groq.com/openai/v1",apiKey:e.GROQ_API_KEY}).chat(e.AI_MODEL??"openai/gpt-oss-120b");
  if((forced==="openrouter"||!forced)&&e.OPENROUTER_API_KEY) return createOpenAI({baseURL:"https://openrouter.ai/api/v1",apiKey:e.OPENROUTER_API_KEY}).chat(e.AI_MODEL??"openai/gpt-oss-120b:free");
  if((forced==="google"||!forced)&&e.GOOGLE_GENERATIVE_AI_API_KEY) return google(e.AI_MODEL??"gemini-3-flash-preview");
  if((forced==="anthropic"||!forced)&&e.ANTHROPIC_API_KEY) return anthropic(e.AI_MODEL??"claude-sonnet-4-6");
  if((forced==="openai"||!forced)&&e.OPENAI_API_KEY) return openai(e.AI_MODEL??"gpt-4.1-mini");
  return e.AI_MODEL??"anthropic/claude-sonnet-4.6"; // AI Gateway (AI_GATEWAY_API_KEY)
}
