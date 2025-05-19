import ProjectSection from './ProjectSection';
import { unstable_noStore as noStore } from 'next/cache';
import { fetchCategories, fetchProjects } from '@/lib/fetchData';
import NoItemsFallback from '@/components/home/ui/NoItemsFallback';

export default async function Projects() {
  noStore();
  const projects = await fetchProjects();
  const categories = await fetchCategories();

  return projects.length < 1 ? (
    <NoItemsFallback />
  ) : (
    <ProjectSection projects={projects} categoriesList={categories} />
  );
}
