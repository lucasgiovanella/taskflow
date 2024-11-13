import React from "react";

export interface Option {
  label: JSX.Element;
  value: string;
}

export interface OptionGroup {
  label: JSX.Element;
  options: Option[];
}

export async function fetchModelos(): Promise<string[]> {
  try {
    const response = await fetch("/files/modelos.txt");
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }
    const data = await response.text();
    const dataArr = data.split("\n").map((line) => line.trim());
    return dataArr;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function formatOptions(data: string[]): OptionGroup[] {
  const groupedData: OptionGroup[] = [];
  let currentGroup: OptionGroup | null = null;

  data.forEach((line) => {
    if (line === "Desktop" || line === "Notebook") {
      if (currentGroup) groupedData.push(currentGroup);
      currentGroup = {
        label: React.createElement("span", {}, line),
        options: [],
      };
    } else if (currentGroup) {
      currentGroup.options.push({
        label: React.createElement("span", {}, line),
        value: line,
      });
    }
  });

  if (currentGroup) groupedData.push(currentGroup);

  return groupedData;
}
