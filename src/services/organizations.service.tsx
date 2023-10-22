import { db } from "../db";
import { InsertOrganization, organizations } from "../db/schema";

export async function createOrganization(data: InsertOrganization) {
  try {
    const [organization] = await db.insert(organizations).values(data).returning()

    return (
      <div>
        <p>organization id {organization.id}</p>
        <h2>organization name {organization.name}</h2>
      </div>
    )
  } catch (err) {
    throw new Error("Failed to create organization.")
  }
}

export async function getOrganizations() {
  try {
    const [organization] = await db.select(
      {
        id: organizations.id,
        name: organizations.name,
        pictureUrl: organizations.pictureUrl,
        createdAt: organizations.createdAt
      }).from(organizations)

    if (!organization) {
      return (<div><p>No organizations found :(</p></div>)
    }
    return (
      <div>
        <p>organization id {organization.id}</p>
        <h2>organization name {organization.name}</h2>
      </div>
    )
  } catch (err) {
    throw new Error("Failed to get organizations info")
  }
}
