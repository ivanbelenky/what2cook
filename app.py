from flask import Flask, render_template, request

import os
import openai 

openai.organization=''
openai.api_key = ''

app = Flask(__name__,
            static_url_path='',
            static_folder='static/',
            template_folder='templates/')

@app.route("/", methods=['GET'])
def home():
    return render_template('home.html') 


@app.route("/recipes", methods=['GET'])
def recipes():
    ingredients = request.args['ingr']
    completion_prompt = f"Give me a recipe and instructions using the following ingredients: {ingredients}\n"
    completion = openai.Completion.create(model='text-davinci-002', prompt=completion_prompt, max_tokens=500, temperature=0.7)
    recipe = parse_recipe(completion['choices'][0]['text'])
    return {
        'recipe':recipe
    }


def parse_recipe(recipe):
    if 'Ingredients:' in recipe:
        recipe = recipe.replace('Ingredients', '<br>INGREDIENTS')
    if 'Instructions:' in recipe:
        recipe = recipe.replace('Instructions', '<br>INSTRUCTIONS')
    return recipe.replace('\n','<br>')