const authorService = require('../services/authorService')

exports.getAllAuthors = (req, res) => {
    // #swagger.tags = ['Authors']
    // #swagger.description = 'retorna todos os autores'
    const authors = authorService.getAllAuthors();
  
    res.status(200).json(authors);
  };


exports.saveAuthor = async (req, res) => {
    // #swagger.tags = ['Authors']
    // #swagger.description = 'salva um autor'
    const {nome, nacionalidade} = req.body;

    const newAuthor = await authorService.saveAuthor(nome, nacionalidade);

    res.status(201).json(newAuthor);
} 

exports.getAuthorById = (req, res) => {
    // #swagger.tags = ['Authors']
    // #swagger.description = 'retorna autor pelo id'
    const author = authorService.getAuthorById(parseInt(req.params.id, 10));

    if (!author) {
      return res.status(404).json({ message: "Autor não encontrado." });
    }

    res.status(200).json(author);

}

exports.updateAuthor = async (req, res) => {
    // #swagger.tags = ['Authors']
    // #swagger.description = 'atualiza um autor'
  const { id } = req.params;
  const { nome, nacionalidade } = req.body;

   try {
    const updatedAuthor = await authorService.updateAuthor(
      parseInt(id, 10),
      nome,
      nacionalidade
    );

    if (!updatedAuthor) {
      return res.status(404).json({ message: "Autor não encontrado." });
    }

    res.status(200).json(updatedAuthor);
   } catch (error) {
     res.status(500).json({ message: "Erro ao atualizar o autor.", error });
   }
};

exports.deleteAuthor = async (req, res) => {
    // #swagger.tags = ['Authors']
    // #swagger.description = 'exclui um autor'

  const { id } = req.params;

  try {
    const isDeleted = await authorService.deleteAuthor(parseInt(id, 10));

    if (!isDeleted) {
      return res.status(404).json({ message: "Autor não encontrado." });
    }

    res.status(200).json({ message: "Autor excluído com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir o autor.", error });
  }

}