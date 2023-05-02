import { GetAll, SaveItem } from "@/controllers/VerbsController";

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      const resultGetAll = await GetAll();
      console.log(resultGetAll);
      res.status(200).json(resultGetAll);
      break;
    case "POST":
      const resultPost = await SaveItem(req.body);
      res.status(200).json(resultPost);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};