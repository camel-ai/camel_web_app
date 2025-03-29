import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Github,
  BookText,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "camel",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Create Your First Agent",
          url: "#",
        },
        {
          title: "Role Playing Session",
          url: "#",
        },
        {
          title: "Workforce Session",
          url: "#",
        },
        {
          title: "Synthetic Data",
          url: "#",
        },
        {
          title: "RAG&Graph RAG",
          url: "#",
        },
        {
          title: "Human-in-the-loop",
          url: "#",
        },
      ],
    },
    // {
    //   title: "Models",
    //   url: "#",
    //   icon: Bot,
    //   items: [
    //     {
    //       title: "Genesis",
    //       url: "#",
    //     },
    //     {
    //       title: "Explorer",
    //       url: "#",
    //     },
    //     {
    //       title: "Quantum",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Documentation",
    //   url: "#",
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: "Introduction",
    //       url: "#",
    //     },
    //     {
    //       title: "Get Started",
    //       url: "#",
    //     },
    //     {
    //       title: "Tutorials",
    //       url: "#",
    //     },
    //     {
    //       title: "Changelog",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  projects: [
    // {
    //   name: "Design Engineering",
    //   url: "#",
    //   icon: Frame,
    // },
    // {
    //   name: "Sales & Marketing",
    //   url: "#",
    //   icon: PieChart,
    // },
    // {
    //   name: "Travel",
    //   url: "#",
    //   icon: Map,
    // },
  ],
}

export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onModuleChange?: (moduleId: string) => void;
}

const moduleIdMap = {
  "Create Your First Agent": "Module1",
  "Role Playing Session": "Module2",
  "Workforce Session": "Module3",
  "Synthetic Data": "Module4",
  "RAG&Graph RAG": "Module5",
  "Human-in-the-loop": "Module6"
};

export function AppSidebar({ onModuleChange, ...props }: AppSidebarProps) {
  const [starCount, setStarCount] = React.useState<number>(0);

  React.useEffect(() => {
    fetch('https://api.github.com/repos/camel-ai/camel')
      .then(response => response.json())
      .then(data => setStarCount(data.stargazers_count))
      .catch(error => console.error('Error fetching star count:', error));
  }, []);

  const handleItemClick = (title: string) => {
    const moduleId = moduleIdMap[title];
    if (moduleId && onModuleChange) {
      onModuleChange(moduleId);
    }
  };

  const navMainWithHandlers = data.navMain.map(section => ({
    ...section,
    items: section.items?.map(item => ({
      ...item,
      onClick: () => handleItemClick(item.title)
    }))
  }));

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-left p-4">
          <img src="/assets/images/camel-logo-purple.svg" alt="Camel Logo" className="h-8" />
        </div>
        {/* <TeamSwitcher teams={data.teams} /> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainWithHandlers} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col gap-2 p-4">
          <a
            href="https://github.com/camel-ai/camel"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <Github className="h-4 w-4" />
            <span>GitHub Stars: {starCount}</span>
          </a>
          <a
            href="https://docs.camel-ai.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <BookText className="h-4 w-4" />
            <span>Documentation</span>
          </a>
        </div>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
