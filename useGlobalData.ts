import { Job } from "@/types";
import { Collection } from "@sourceflow-uk/sourceflow-sdk";

export async function getJobsData(slug?: string) {
  const data = await Collection("jobs");
  const jobItem = slug
    ? data.jobs.find((job: Job) => job.url_slug === slug)
    : null;

  return { job: jobItem, allJobs: data.jobs };
}
