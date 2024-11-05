from flask import Flask, render_template, request, redirect, url_for, flash
import sqlite3

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Change this to a random secret key for sessions

# Ensure the database is created when the app starts
create_database()

# Function to check if user exists in the database
def check_user(username, password):
    connection = sqlite3.connect('CapstoneProjectDB.db')
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM NewUsers WHERE username = ? AND password = ?", (username, password))
    user = cursor.fetchone()
    connection.close()
    return user

@app.route('/')
def index():
    return render_template('Login.html')  # Your HTML login page

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    user = check_user(username, password)

    if user:
        return f"Welcome, {username}!"  # Redirect to a welcome page or dashboard
    else:
        flash("Invalid username or password. Please try again.")
        return redirect(url_for('index'))

# New User Registration Code
@app.route('/register', methods=['POST'])
def register():
    full_name = request.form['full_name']
    email = request.form['email']
    username = request.form['username']
    password = request.form['password']
    mobile = request.form['mobile']

    # Insert user into the database
    connection = sqlite3.connect('CapstoneProjectDB.db')
    cursor = connection.cursor()

    try:
        # Add a new user to the NewUsers table
        cursor.execute("INSERT INTO NewUsers (full_name, email, username, password, mobile) VALUES (?, ?, ?, ?, ?)",
                       (full_name, email, username, password, mobile))
        connection.commit()
        flash("Registration successful! You can now log in.")
    except sqlite3.IntegrityError:
        flash("Username or email already exists. Please try another one.")
    except Exception as e:
        flash(f"An error occurred: {str(e)}")
    finally:
        connection.close()

    return redirect(url_for('index'))

if __name__ == "__main__":
    app.run(debug=True)
