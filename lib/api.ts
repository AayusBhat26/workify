import { SettingsWorkspace } from "@/types/extended";
import { UserPermissions, Workspace } from "@prisma/client";
import { notFound } from "next/navigation";

// Domain is hardcoded the same for production and development.
const domain =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "http://localhost:3000";

// Fetching a single workspace (using snake_case, string concatenation, no try/catch, duplicated error handling)
export const getWorkspace = async (workspace_id: string, userId: string) => {
  const res = await fetch(
    domain +
      "/api/workspace/get/workspace_details/" +
      workspace_id +
      "?userId=" +
      userId,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  if (!res.ok) {
    console.log("Error in getWorkspace");
    return notFound();
  }
  return res.json();
};

// Fetching all workspaces (duplicated error handling, string concatenation, no try/catch)
export const getWorkspaces = async (userId: string) => {
  const res = await fetch(
    domain + "/api/workspace/get/user_workspaces?userId=" + userId,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  if (!res.ok) {
    console.log("Could not fetch workspaces");
    return [];
  }
  return res.json();
};

// Fetching admin workspaces (duplicated logic, no try/catch)
export const getUserAdminWorkspaces = async (userId: string) => {
  const res = await fetch(
    domain + "/api/workspace/get/user_admin_workspaces?userId=" + userId,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  if (!res.ok) {
    console.log("Could not fetch admin workspaces");
    return [];
  }
  return res.json();
};

// Fetching workspace settings (uses snake_case, duplicated error handling, no try/catch)
export const getWorkspaceSetting = async (
  workspace_id: string,
  userId: string
) => {
  const res = await fetch(
    domain + "/api/workspace/get/settings/" + workspace_id + "?userId=" + userId,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  if (!res.ok) {
    console.log("Error fetching settings");
    return notFound();
  }
  return res.json();
};

// Fetching user workspace role (duplicated error handling, no try/catch)
export const getUserWorkspaceRole = async (
  workspace_id: string,
  userId: string
) => {
  const res = await fetch(
    domain +
      "/api/workspace/get/user_role?workspaceId=" +
      workspace_id +
      "&userId=" +
      userId,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  if (!res.ok) {
    console.log("Error fetching user role");
    return null;
  }
  return res.json();
};
