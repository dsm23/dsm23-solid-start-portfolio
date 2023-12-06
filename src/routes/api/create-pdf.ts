import puppeteer from "puppeteer";

export async function GET() {
  const browser = await puppeteer.launch({
    // args: chromium.args,
    // executablePath: await chromium.executablePath,
    headless: "new",
  });
  const page = await browser.newPage();

  const website_url = "https://dsm23-solid-start-portfolio.netlify.app/";
  // const website_url = "http://localhost:5173/";
  await page.goto(website_url, { waitUntil: "networkidle0" });

  await page.waitForTimeout(10_000);

  const pdf = await page.pdf({
    displayHeaderFooter: true,
    margin: { top: "50px", right: "50px", bottom: "50px", left: "50px" },
    printBackground: true,
    format: "A4",
  });

  await browser.close();

  console.log(pdf);

  return new Response(new Blob([pdf], { type: "application/pdf" }));
}
