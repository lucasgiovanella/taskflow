FROM python:3.9

WORKDIR /app

COPY requirements.txt .

# Atualiza o pip
RUN pip install --upgrade pip

# Instala as dependências
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "app.py"]