from flask import Flask, render_template, request

app = Flask(__name__)

flag1 = "HKSP{Io_a_napoli_non_ci_sono_mai_stato_tantomeno_in_moto}"
flag2 = "HKSP{sinni_mundo_ci_fosse_un_po_di_bene}"
# 
@app.route('/')
def home():
    #  e lo stile?

    return render_template('index.html')

@app.route('/link')
def link_to_wh():
    #  return the static directory
    return render_template('link.txt')



@app.route('/submit_flag1', methods=['POST'])
def submit():
    # Ottieni i dati inviati dal form
    flag = request.form['flag1']
    # Controlla se il flag è corretto
    if flag == flag1:
        return render_template('flag1.html')
    else:
        return 'Flag sbagliato!'
@app.route('/submit_flag2', methods=['POST'])
def submit2():
    # Ottieni i dati inviati dal form
    flag = request.form['flag2']
    # Controlla se il flag è corretto
    if flag == flag2:
        return render_template('flag2.html')
    else:
        return 'Flag sbagliato!'
    

if __name__ == '__main__':
    import os

    os.environ['FLASK_ENV'] = 'development'
    os.environ['FLASK_DEBUG'] = '1'
    app.config['WTF_CSRF_ENABLED'] = False

    app.run(host='localhost', port=5000, debug=True)