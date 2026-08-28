export function GET() {
  return Response.json(
    { status: "healthy", service: "blog" },
    { status: 200 },
  );
}
