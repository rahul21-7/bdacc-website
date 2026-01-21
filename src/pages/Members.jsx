import { useEffect, useState } from "react";
import MemberCard from "../components/MemberCard";
import { supabase } from "../services/supabase";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMembers() {
      const { data, error } = await supabase
        .from("members")
        .select("*")
        .eq("approved", true)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching members:", error);
      } else {
        setMembers(data);
      }

      setLoading(false);
    }

    fetchMembers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading members...
      </div>
    );
  }

  const coreTeam = members.filter(m => m.role === "Core Team");
  const leads = members.filter(m => m.role === "Lead");
  const regularMembers = members.filter(m => m.role === "Member");

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 text-center mb-12">
          Our Team
        </h1>

        <Section title="Core Team">
          {coreTeam.map(member => (
            <MemberCard
              key={member.id}
              name={member.name}
              role={member.role}
              image={member.image_url}
              linkedin={member.linkedin}
              github={member.github}
            />
          ))}
        </Section>

        <Section title="Leads">
          {leads.map(member => (
            <MemberCard
              key={member.id}
              name={member.name}
              role={member.role}
              image={member.image_url}
              linkedin={member.linkedin}
              github={member.github}
            />
          ))}
        </Section>

        <Section title="Members">
          {regularMembers.map(member => (
            <MemberCard
              key={member.id}
              name={member.name}
              role={member.role}
              image={member.image_url}
              linkedin={member.linkedin}
              github={member.github}
            />
          ))}
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  if (!children.length) return null;

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-semibold text-blue-800 mb-6">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {children}
      </div>
    </section>
  );
}


