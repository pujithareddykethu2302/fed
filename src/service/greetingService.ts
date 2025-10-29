export interface Greeting {
  startHour: number;
  endHour: number;
  greeting: string;
  captions: string[];
}

export const fetchGreetings = async (): Promise<Greeting[]> => {
  try {
    // Use correct base URL (GitHub Pages needs import.meta.env.BASE_URL)
    const base =
      import.meta.env.BASE_URL === "/" ? "" : import.meta.env.BASE_URL;

    const url = `${base}data/greetings.json`;


    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to load greetings.json: ${response.statusText}`);
    }

    const data = await response.json();


    return data;
  } catch (error) {
    console.error("❌ Error loading greetings:", error);
    return [];
  }
};
