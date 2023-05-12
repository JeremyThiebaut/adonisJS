import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Category from 'App/Models/Category'
import Post from 'App/Models/Post'
import UpdatePostValidator from 'App/Validators/UpdatePostValidator'

export default class BlogsController {
  public async index({ view, request }: HttpContextContract) {
    const page = request.input('page', 1)
    const posts = await Database.from(Post.table).paginate(page, 2)
    return view.render('blog/index', {
      posts,
    })
  }

  public async create({ view }: HttpContextContract) {
    const post = new Post()
    const categories = await Category.all()
    return view.render('blog/create', {
      post,
      categories,
    })
  }

  public async store({ params, request, session, response }: HttpContextContract) {
    await this.handleRequest(params, request)
    session.flash({ success: "L'article a bien été créé" })
    return response.redirect().toRoute('home')
  }

  public async show({ params, view }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    const categories = await Category.all()
    // const post = await Post.query().preload('category').where('id', params.id).firstOrFail()
    return view.render('blog/show', {
      post,
      categories,
    })
  }

  public async update({ params, request, response, session }: HttpContextContract) {
    await this.handleRequest(params, request)
    session.flash({ success: "L'article a bien été sauvegardé" })
    return response.redirect().toRoute('home')
  }

  public async destroy({ params, session, response }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    await post.delete()
    session.flash({ success: "L'article a bien été supprimé" })
    return response.redirect().toRoute('home')
  }

  private async handleRequest(
    params: HttpContextContract['params'],
    request: HttpContextContract['request']
  ) {
    const post = params.id ? await Post.findOrFail(params.id) : new Post()
    const data = await request.validate(UpdatePostValidator)
    post.merge({ ...data, online: data.online || false }).save()
  }
}
