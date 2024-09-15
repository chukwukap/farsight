"use server";
import { init, fetchQuery } from "@airstack/node";

if (!process.env.AIRSTACK_API_KEY) {
  throw new Error("AIRSTACK_API_KEY is not set in environment variables");
}

init(process.env.AIRSTACK_API_KEY);

export async function queryAirstack(
  query: string,
  variables: Record<string, unknown> = {}
) {
  try {
    const { data, error } = await fetchQuery(query, variables);
    console.log("data", data);
    if (error) {
      console.log("There was an error in queryAirstack", error);
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error("Airstack API error:", error);
    throw error;
  }
}
