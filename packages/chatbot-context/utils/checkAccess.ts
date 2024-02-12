import prisma from "./prisma.mjs";

async function getProjectData(projectID: string) {
  const project = await prisma.project.findFirst({
    where: {
      id: projectID,
    },
  });


  if (!project) {
    return { error: true, projects: null };
  }

  return { project: project, error: false };
}

export { getProjectData };
