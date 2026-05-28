/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'qraw8rm7'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'ers'
const appId = 'j053us8n7ge8e4gmqm6txklt'

export default defineCliConfig({
	api: { projectId, dataset },
	deployment: { appId },
})
