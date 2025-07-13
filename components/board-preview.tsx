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

type Detail = {
  project: string;
  lastUpdated: string;
  tasks: string;
};

export function BoardPreview({ details }: { details: Detail[] }) {
  return (
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
  );
}
