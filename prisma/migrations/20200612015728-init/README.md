# Migration `20200612015728-init`

This migration has been generated at 6/12/2020, 1:57:28 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."Point" (
"city" TEXT NOT NULL  ,"email" TEXT NOT NULL  ,"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"image" TEXT NOT NULL  ,"latitude" REAL NOT NULL  ,"longitude" REAL NOT NULL  ,"name" TEXT NOT NULL  ,"uf" TEXT NOT NULL  ,"whatsapp" TEXT NOT NULL  )

CREATE TABLE "quaint"."Item" (
"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"image" TEXT NOT NULL  ,"title" TEXT NOT NULL  )

CREATE TABLE "quaint"."_ItemToPoint" (
"A" INTEGER NOT NULL  ,"B" INTEGER NOT NULL  ,FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("B") REFERENCES "Point"("id") ON DELETE CASCADE ON UPDATE CASCADE)

CREATE UNIQUE INDEX "quaint"."_ItemToPoint_AB_unique" ON "_ItemToPoint"("A","B")

CREATE  INDEX "quaint"."_ItemToPoint_B_index" ON "_ItemToPoint"("B")

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200612015728-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,31 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "sqlite"
+  url      = "file:./database.sqlite"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Point {
+  id Int @default(autoincrement()) @id
+  image String
+  name String
+  email String
+  whatsapp String
+  latitude Float
+  longitude Float
+  city String
+  uf String
+  items Item[] @relation(references: [id])
+}
+
+model Item {
+  id Int @default(autoincrement()) @id
+  image String
+  title String
+  points Point[] @relation(references: [id])
+}
```


