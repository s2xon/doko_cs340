import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const details = [
  {
    project: "dokoProj",
    lastUpdated: "Jul 11 2024: 12:40PM",
    tasks: "12 Tasks Remaining",
  },
];

export default function Home() {
  return (
    <>
      <nav className="cherry-bomb-one-regular w-full text-3xl h-16 px-4 py-2 flex font-bold  border-b-1 border-sky-100">
        <h1>
          <Link href="/">
            do<span className="underline decoration-sky-500">ko</span>
          </Link>
        </h1>
      </nav>
      <section className="p-12">
        {" "}
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Project</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Tasks Remaining</TableHead>
              <TableHead className="text-right">Total Projects</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {details.map((details) => (
              <TableRow key={details.project}>
                <TableCell className="font-medium">{details.project}</TableCell>
                <TableCell>{details.lastUpdated}</TableCell>
                <TableCell>{details.tasks}</TableCell>
                <TableCell className="text-right">1</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">1</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </section>
    </>
  );
}
