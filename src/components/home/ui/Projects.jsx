import Carousel from '@/components/widgets/carousel/Carousel';
import ProjectCard from './ProjectCard';
import NoItemsFallback from './NoItemsFallback';
import ProjectsMotion from './ProjectsMotion';

export default function Projects({ projects }) {
  return (
    <ProjectsMotion>
      {projects.length < 1 ? (
        <NoItemsFallback />
      ) : (
        <Carousel>
          {projects.map((project) => (
            <div key={project.id} className="embla__slide">
              <ProjectCard project={project} />
            </div>
          ))}
        </Carousel>
      )}
    </ProjectsMotion>
  );
}
