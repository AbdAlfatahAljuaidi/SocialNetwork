import { FaUser, FaQuestion } from "react-icons/fa";
import { MdTipsAndUpdates, MdReviews } from "react-icons/md";
import { AiFillProfile } from "react-icons/ai";
import { PiStudentFill } from "react-icons/pi";
import { SiTutanota } from "react-icons/si";

const cardsData = [
  {
    id: 1,
    title: "Connect Students",
    description:
      "Ask AAU bridges the gap between students by providing a seamless platform for sharing knowledge and solving academic queries.",
    icon: FaQuestion,
  },
  {
    id: 2,
    title: "Peer Learning",
    description:
      "Through Ask AAU, students can learn from each other and build a supportive academic community.",
    icon: MdTipsAndUpdates,
  },
  {
    id: 3,
    title: "Simplify Interaction",
    description:
      "The platform enables students to ask questions and get answers in real-time, fostering collaboration and understanding.",
    icon: AiFillProfile,
  },
  {
    id: 4,
    title: "Reliable Solutions",
    description:
      "Ask AAU ensures all answers are student-driven yet monitored, creating a trusted resource for academic support.",
    icon: PiStudentFill,
  },
  {
    id: 5,
    title: "Campus Communication",
    description:
      "Students from different faculties can now connect, share ideas, and exchange expertise through one centralized platform.",
    icon: SiTutanota,
  },
  {
    id: 6,
    title: "Student Engagement",
    description:
      "Ask AAU redefines how students interact, transforming traditional Q&A into a dynamic and interactive experience.",
    icon: MdReviews,
  },
];

export default cardsData;
