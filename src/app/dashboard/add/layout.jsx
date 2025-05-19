import Tabs from '../ui/Tabs';
import { ProjectIcon, PostIcon, UserIcon } from '../ui/Icons';

export default async function AddLayout({ projects, posts, users }) {
  const tabs = [
    {
      key: 'project',
      label: 'Project',
      icon: <ProjectIcon />,
      content: projects,
    },
    { key: 'post', label: 'Post', icon: <PostIcon />, content: posts },
    { key: 'user', label: 'User', icon: <UserIcon />, content: users },
  ];

  return (
    <div className="px-4 sm:px-6 md:px-8">
      <Tabs tabs={tabs} />
    </div>
  );
}
