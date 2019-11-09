import { Game } from "./models/Game";
import { BASE_API } from "./Config";
import { myBookie } from "./models/Bookies";
import { ResponseError, ValidationError, UserError } from "./models/Errors";

export default class ApiService {
  private defaultHeaders = () => ({
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json"
    })
  });

  private unwrapResponse = async <TResult>(r: Response) => {
    const json = await r.json();
    if (r.ok) {
      return json as TResult;
    } else if (r.status === 400) {
      const re = json as ResponseError;
      if (re.property) {
        throw new ValidationError(re.property, re.message);
      }
      throw new UserError(r.status, re.message);
    }

    throw new Error(json);
  };

  private getCommand = <TResult>(path: string) =>
    fetch(BASE_API + path, this.defaultHeaders()).then(r =>
      this.unwrapResponse<TResult>(r)
    );
  private deleteCommand = <TResult>(path: string) =>
    fetch(BASE_API + path, {
      ...this.defaultHeaders(),
      method: "DELETE"
    }).then(r => this.unwrapResponse<TResult>(r));

  private postCommand = <TBody, TResult>(path: string, body: TBody) =>
    fetch(BASE_API + path, {
      ...this.defaultHeaders(),
      body: JSON.stringify(body),
      method: "POST"
    }).then(r => this.unwrapResponse<TResult>(r));

  private putCommand = <TBody, TResult>(path: string, body: TBody) =>
    fetch(BASE_API + path, {
      ...this.defaultHeaders(),
      body: JSON.stringify(body),
      method: "PUT"
    }).then(r => this.unwrapResponse<TResult>(r));

  getGames = () =>
    this.getCommand<any[]>(`widget?myBookie=${myBookie}`).then(games =>
      games.map(g => ({ ...g, date: Date.parse(g.date) } as Game))
    );
}
