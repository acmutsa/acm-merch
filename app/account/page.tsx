import { db } from "@/db";
import { user } from "@/db/auth-schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { ProfileImagePicker } from "@/components/ui/profile-image-picker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

async function updateProfile(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const userId = formData.get("userId")?.toString().trim() ?? "";
  const imageEntry = formData.get("image");

  // if (!name || !email) {
  //   return { error: "Both fields required" };
  // }

  let imageUrl: string | undefined;

  if (imageEntry instanceof File && imageEntry.size > 0) {
    const arrayBuffer = await imageEntry.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mimeType = imageEntry.type || "image/png";
    const base64 = buffer.toString("base64");
    imageUrl = `data:${mimeType};base64,${base64}`;
  }

  await db
    .update(user)
    .set({
      name,
      email,
      ...(imageUrl && { image: imageUrl }),
    })
    .where(eq(user.id, userId));

  revalidatePath("/account");
  redirect("/");
  }

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });
  const email = session?.user?.email ?? null;
  

  const rows = email
    ? await db.select().from(user).where(eq(user.email, email))
    : [];

  const account = rows[0] ?? null;

  const profileImage = account?.image?.trim() || "/assets/logo.png";

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-0">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">Account</h1>
        <p className="text-sm text-muted-foreground">
          Manage your profile details and contact information.
        </p>
      </div>

      <form action={updateProfile}>
        <Card>
          <CardHeader className="border-b">
            <CardTitle>Profile details</CardTitle>
            <CardDescription>
              Keep your personal info up to date so we can reach you if needed.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            <input type="hidden" name="userId" value={account?.id ?? ""} />

            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <ProfileImagePicker currentImage={profileImage} />
              <p className="text-center text-sm text-muted-foreground sm:text-left">
                Click your avatar to upload a new photo. PNG or JPG up to 5MB.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={account?.name ?? ""}
                  placeholder="Jane Doe"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  defaultValue={account?.email ?? ""}
                  placeholder="jane@example.com"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="w-full sm:w-auto">
                Save changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </section>
  );
}
