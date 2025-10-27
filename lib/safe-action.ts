import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { auth } from "./auth";

export const actionClient = createSafeActionClient();
