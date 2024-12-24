import { Inter } from 'next/font/google';
import { Lusitana } from 'next/font/google';

/*
Google Fonts *sbusets* available for Inter:

latin - Basic Latin characters (English, Western European)
latin-ext - Extended Latin (Central/Eastern European)
cyrillic - Russian, Ukrainian, etc.
cyrillic-ext - Extended Cyrillic
greek - Greek alphabet
greek-ext - Extended Greek
vietnamese - Vietnamese characters
*/
export const inter = Inter({ subsets: ["latin"] })
export const lusitana = Lusitana({ subsets: ["latin"], weight: ["400", "700"] })