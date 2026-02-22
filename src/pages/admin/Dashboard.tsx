import { cmsBlogs, cmsContacts, cmsFAQ } from "@/lib/cms";

export default function Dashboard() {
  const blogs = cmsBlogs.list();
  const faqs = cmsFAQ.list();
  const contacts = cmsContacts.list();
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-[#1F2937] p-6 rounded-xl">
        <p className="text-gray-400">Artikel Blog</p>
        <h2 className="text-3xl font-bold">{blogs.length}</h2>
      </div>
      <div className="bg-[#1F2937] p-6 rounded-xl">
        <p className="text-gray-400">FAQ</p>
        <h2 className="text-3xl font-bold">{faqs.length}</h2>
      </div>
    </div>
  );
}

