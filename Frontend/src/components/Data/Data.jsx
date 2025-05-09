import { FaUser, FaQuestion } from "react-icons/fa";
import { MdTipsAndUpdates, MdReviews } from "react-icons/md";
import { AiFillProfile } from "react-icons/ai";
import { PiStudentFill } from "react-icons/pi";
import { SiTutanota } from "react-icons/si";
const cardsData = [
  {
    id: 1,
    title: {
      en: "Connect Students",
      ar: "ربط الطلاب"
    },
    description: {
      en: "Ask AAU bridges the gap between students by providing a seamless platform for sharing knowledge and solving academic queries.",
      ar: "يوفر Ask AAU منصة سهلة للطلاب لربطهم ببعضهم البعض من خلال تبادل المعرفة وحل الاستفسارات الأكاديمية."
    },
    icon: FaQuestion,
  },
  {
    id: 2,
    title: {
      en: "Peer Learning",
      ar: "التعلم بين الأقران"
    },
    description: {
      en: "Through Ask AAU, students can learn from each other and build a supportive academic community.",
      ar: "من خلال Ask AAU، يمكن للطلاب التعلم من بعضهم البعض وبناء مجتمع أكاديمي داعم."
    },
    icon: MdTipsAndUpdates,
  },
  {
    id: 3,
    title: {
      en: "Simplify Interaction",
      ar: "تبسيط التفاعل"
    },
    description: {
      en: "The platform enables students to ask questions and get answers in real-time, fostering collaboration and understanding.",
      ar: "تتيح المنصة للطلاب طرح الأسئلة والحصول على الإجابات في الوقت الفعلي، مما يعزز التعاون والفهم."
    },
    icon: AiFillProfile,
  },
  {
    id: 4,
    title: {
      en: "Reliable Solutions",
      ar: "حلول موثوقة"
    },
    description: {
      en: "Ask AAU ensures all answers are student-driven yet monitored, creating a trusted resource for academic support.",
      ar: "يضمن Ask AAU أن جميع الإجابات يقودها الطلاب مع المتابعة، مما يخلق مصدرًا موثوقًا للدعم الأكاديمي."
    },
    icon: PiStudentFill,
  },
  {
    id: 5,
    title: {
      en: "Campus Communication",
      ar: "التواصل الجامعي"
    },
    description: {
      en: "Students from different faculties can now connect, share ideas, and exchange expertise through one centralized platform.",
      ar: "يمكن للطلاب من مختلف الكليات الآن التواصل ومشاركة الأفكار وتبادل الخبرات من خلال منصة واحدة مركزة."
    },
    icon: SiTutanota,
  },
  {
    id: 6,
    title: {
      en: "Student Engagement",
      ar: "مشاركة الطلاب"
    },
    description: {
      en: "Ask AAU redefines how students interact, transforming traditional Q&A into a dynamic and interactive experience.",
      ar: "يُعيد Ask AAU تعريف كيفية تفاعل الطلاب، محولًا الأسئلة والأجوبة التقليدية إلى تجربة تفاعلية وديناميكية."
    },
    icon: MdReviews,
  },
];

export default cardsData;
