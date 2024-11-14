import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET(request, { params }) {
    const { id } = params;  
  
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE userid = ?', [id]);
      
      if (rows.length === 0) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      return NextResponse.json(rows[0]); 
    } catch (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const { emailaddress, name, password, userid } = await req.json();

        if (!emailaddress || !name || !password || !userid) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if the email or name already exists for another user
        const [existingUser] = await pool.query(
            'SELECT * FROM users WHERE (emailaddress = ? OR name = ?) AND userid != ?',
            [emailaddress, name, userid]
        );

        if (existingUser.length > 0) {
            return NextResponse.json(
                { error: 'User with the same email or name already exists' },
                { status: 409 } // 409 Conflict status code
            );
        }

        // Hash the password before updating it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user
        await pool.query(
            'UPDATE users SET emailaddress = ?, name = ?, password = ? WHERE userid = ?',
            [emailaddress, name, hashedPassword, userid]
        );

        return NextResponse.json(
            {
                message: 'User updated successfully',
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Database update error:', error.message);
        return NextResponse.json(
            { error: 'Database update failed' },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    const { id } = params;

    try {
        // Check if the user exists
        const [existingUser] = await pool.query('SELECT * FROM users WHERE userid = ?', [id]);

        if (existingUser.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Delete the user
        await pool.query('DELETE FROM users WHERE userid = ?', [id]);

        return NextResponse.json(
            { message: 'User deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Database delete error:', error.message);
        return NextResponse.json(
            { error: 'Database delete failed' },
            { status: 500 }
        );
    }
}