import app from "./daysync-bundle.mjs";

export default function handler(req: any, res: any) {
  return app(req, res);
}
