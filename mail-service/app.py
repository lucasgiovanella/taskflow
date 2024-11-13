from flask import Flask, request, jsonify
import subprocess
import os
import shlex
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

VALID_TOKEN = os.getenv('EMAIL_TOKEN', 'elTLSIvorZSfju3pAvHssH0Yq2eEeQDTo3kKO5t6gKalLk705S')

@app.route('/mail-send', methods=['POST'])
def send_mail():
    try:
        data = request.get_json()
        if not data or data.get('token') != VALID_TOKEN:
            return jsonify({'error': 'Invalid token'}), 401

        title = data.get('title')
        computer_name = data.get('computerName')
        body = data.get('body')
        to_email = data.get('to')

        if not all([title, computer_name, body, to_email]):
            return jsonify({'error': 'Missing required fields'}), 400

        # Escapar o corpo do email com shlex.quote e adicionar aspas duplas para proteger caracteres especiais
        escaped_body = f'"{shlex.quote(body)}"'

        command = f'sendEmail -f taskflow@univates.br -t {to_email} -u "{title} - {computer_name}" -m {escaped_body}'

        print(f"Executando comando: {command}")

        process = subprocess.Popen(
            command,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )

        stdout, stderr = process.communicate()

        print(f"STDOUT: {stdout}")
        print(f"STDERR: {stderr}")

        if process.returncode != 0:
            return jsonify({
                'error': 'Failed to send email',
                'details': stderr,
                'command': command
            }), 500

        return jsonify({'message': 'Email sent successfully'})

    except Exception as e:
        print(f"Erro excepcional: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("Iniciando servidor mail-service...")
    app.run(host='0.0.0.0', port=5000, debug=True)