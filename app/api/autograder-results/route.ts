import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // In a real application, this would fetch from a database
    // For now, we'll read from the result.txt file
    const filePath = path.join(process.cwd(), 'public', 'result.txt');
    
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Autograder results not found' },
        { status: 404 }
      );
    }
    
    // Read the file
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Parse the JSON
    const result = JSON.parse(fileContent);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error reading autograder results:', error);
    return NextResponse.json(
      { error: 'Failed to load autograder results' },
      { status: 500 }
    );
  }
} 