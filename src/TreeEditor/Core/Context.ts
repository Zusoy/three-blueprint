import { Game, Scene } from 'Game'

export class Context
{
  public static FromGame(game: Game): Context
  {
    return new Context(game, game.mainScene)
  }

  constructor(public readonly game: Game, public readonly scene: Scene)
  {
  }
}