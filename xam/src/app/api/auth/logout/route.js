import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        // Invalidate the token (this can be done by removing it from the client-side or maintaining a blacklist of tokens server-side)
        return NextResponse.json(
            {
                message: 'Logout successful',
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Logout error:', error.message);

        return NextResponse.json(
            { error: 'Logout failed' },
            { status: 500 }
        );
    }
}