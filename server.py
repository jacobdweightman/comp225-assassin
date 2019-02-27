from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello world"

@app.route('/findGame', methods=['GET'])
def find_game():
    game_code = request.args.get('gameCode', None)
    
    if game_code == "1234":
        return jsonify({
            "err": 0,
            "name": "Mac Assassin 2k19",
            "gameRules": "This is a place for the game creator to write some text about the house rules \&mdash; for instance, in this game assassinations are made by publically serenading your target. For the target to die of embarassment, there must be a section ofCOMP-225 present."
        })
    else:
        return jsonify({
            "err": 1,
            "msg": "game not found"
        })


if __name__ == '__main__':
    app.run(debug=True)
