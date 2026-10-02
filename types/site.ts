export type BuildStepId = "search"|"info"|"photos"|"select"|"content"|"design"|"generate";
export type StepStatus = "pending"|"active"|"done"|"error";
export type BuildStep = { id: BuildStepId; label: string; status: StepStatus; detail?: string };
export const BUILD_STEPS: { id: BuildStepId; label: string }[] = [
  {id:"search",label:"Recherche du commerce"},{id:"info",label:"Récupération des informations"},
  {id:"photos",label:"Analyse des photos"},{id:"select",label:"Sélection des meilleures images"},
  {id:"content",label:"Création du contenu"},{id:"design",label:"Création du design"},
  {id:"generate",label:"Génération du site"}];
