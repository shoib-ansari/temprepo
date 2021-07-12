from flask import Flask,render_template,request,jsonify,json,redirect,url_for
from flask_mail import Mail, Message
import mysql.connector
import random
app=Flask(__name__)
app.config.update(
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=465,
    MAIL_USE_SSL=True,
    MAIL_USERNAME='somethingsomeone023@gmail.com',
    MAIL_PASSWORD='someone023'
)

# CREATING MAIL OBJECT
mail=Mail(app)

@app.route('/sendmail',methods=['POST'])
def send():
    data={
        "otp1":random.randint(100,999),
        "otp2":random.randint(100,999)
    }
    msg=Message(subject="Password Verification Message",
    sender='somethingsomeone023@gmail.com',
    recipients=['ansarishoib011@gmail.com'],
    body = render_template('temp.htm'),
    html = render_template('temp.htm',**data))
    mail.send(msg)


@app.route('/')
def index():
    return render_template('index.htm',data={})

# @app.route('/search')
# def search():
#     return 'You searched for'+' '+request.args.get('q')

# AUTH URL
@app.route('/auth',methods=['POST'])
def auth():
    email=request.form.get('email')
    pwd=request.form.get('pwd')
    # CONNECTION CODE
    mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="flaskproj")
    # CREATE CURSOR THAT TAKE QUERY FROM BACKEND TO DB
    cur=mydb.cursor()
    q="SELECT * FROM USERACCOUNTS WHERE email='{}'".format(email,pwd)
    cur.execute(q)
    a=cur.fetchone()
    print(a)
    data=""
    if not a:
        data="no user found"
    else:
        if(a[2]==pwd):
            data="success"
        else:
            data="wrong pwd"
    data={"msg":data}
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

    # mobile=request.form.get('mobile')


    # q1="SELECT * FROM USERACCOUNTS WHERE email='{}' or mobile='{}'".format(email,mobile)
    # cur.execute(q1)
    # flag=cur.fetchone()
    # if flag:
    #     return render_template('index.htm',mail_err="email already exist.Try using another one",mobile_err="This number is already regestered. Try using another one")
    # query="INSERT INTO useraccounts (email,pwd,mobile) VALUES(%s,%s,%s)"
    # values=(email,pwd,mobile)
    # cur.execute(query,values)
    # # COMMIT CHANGES IF AUTOCOMMIT ISN'T TURNED ON
    # mydb.commit()
    # return str(cur.rowcount)+" record inserted inserted Thank you !!😁"

# @app.route('/lp')
# def loginpage():
#     return render_template('login.html')

# REGISTER FUNCTION
@app.route('/register',methods=['POST'])
def register():
    email=request.form.get('email')
    pwd=request.form.get('pwd')
    if email and pwd:
        # create connection
        conn=mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="flaskproj"
        )
        cur=conn.cursor()
        q1="select * from useraccounts where email='{}'".format(email)
        cur.execute(q1)
        a=cur.fetchone()
        if not a:
            q="INSERT INTO useraccounts (email,pwd) VALUES('{}','{}')".format(email,pwd)
            cur.execute(q)
            conn.commit()
            return render_template('index.htm',user=email)
        else:
            return "Email already exost use another one."
    return "Some error occured try again..."

# LOGIN FUNCTION
@app.route('/login',methods=['POST'])
def login():
    email =request.form['email']
    pwd=request.form['pwd']
    # create connection :----
    db=mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="flaskproj"
    )
    cur=db.cursor()
    q="SELECT * FROM useraccounts WHERE email='{}'".format(email)
    cur.execute(q)
    a=cur.fetchone()
    if not a:
        return "No account associated with this email address."
    else:
        print("OK-----",a)
        if(a[2]==pwd):
            return "Bingo!! Logged in successfully..."
        else:
            return "Bhai password dekh le ek brr"
            
if __name__=='__main__':
    app.run(debug=True)