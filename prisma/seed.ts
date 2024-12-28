import * as fs from 'fs';

import { PrismaClient } from '@prisma/client';
import { parse } from 'csv-parse/sync';

const prisma = new PrismaClient();

const csvToString = (csvPath: string) => {
  const rawCsv = fs.readFileSync(csvPath).toString();

  return parse(rawCsv);
};

async function seedThemes() {
  const parsedThemes = csvToString('prisma/seeds/Themes.csv');
  const themes = parsedThemes.reduce((acc, row, idx) => {
    if (idx == 0) return acc;

    acc.push({
      id: row[0],
      value: row[1],
      title: row[2],
    });

    return acc;
  }, []);

  console.log('Creating themes if needed');

  const themesPromise = themes.map(async (theme) => {
    const existTheme = await prisma.theme.findFirst({
      where: { id: theme.id },
    });

    if (!existTheme) {
      console.log(`Creating: ${theme.id} because it does not exist`);

      try {
        await prisma.theme.create({
          data: theme,
        });
      } catch (err) {
        console.log(err);
      }
    }
  });

  await Promise.allSettled(themesPromise);
}
async function seedCountries() {
  const parsedCountries = csvToString('prisma/seeds/Countries.csv');
  const countries = parsedCountries.reduce((acc, row, idx) => {
    if (idx == 0) return acc;

    acc.push({
      id: row[0],
      value: row[1],
      title: row[2],
    });

    return acc;
  }, []);

  console.log('Creating countries if needed');

  const countriesPromise = countries.map(async (country) => {
    const existTheme = await prisma.country.findFirst({
      where: { id: country.id },
    });

    if (!existTheme) {
      console.log(`Creating: ${country.id} because it does not exist`);

      try {
        await prisma.country.create({
          data: country,
        });
      } catch (err) {
        console.log(err);
      }
    }
  });

  await Promise.allSettled(countriesPromise);
}

async function main() {
  await seedThemes();
  await seedCountries();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
