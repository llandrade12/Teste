/**
 * Funcionalidade de Drag and Drop para Upload de Fotos
 * Permite arrastar imagens diretamente para a área de preview
 */

document.addEventListener('DOMContentLoaded', function() {
  const photoPreview = document.getElementById('photoPreview');
  
  if (!photoPreview) return;

  // Previne comportamento padrão do navegador ao arrastar
  photoPreview.addEventListener('dragover', handleDragOver, false);
  photoPreview.addEventListener('dragleave', handleDragLeave, false);
  photoPreview.addEventListener('drop', handleDrop, false);

  // Também adiciona suporte a drag-and-drop na janela inteira para a área do formulário
  const formSection = document.querySelector('.form-section');
  if (formSection) {
    formSection.addEventListener('dragover', function(e) {
      e.preventDefault();
      e.stopPropagation();
    }, false);
    
    formSection.addEventListener('drop', function(e) {
      e.preventDefault();
      e.stopPropagation();
    }, false);
  }
});

/**
 * Manipula o evento de arrastar sobre a área
 */
function handleDragOver(e) {
  e.preventDefault();
  e.stopPropagation();
  
  const photoPreview = document.getElementById('photoPreview');
  photoPreview.classList.add('drag-over');
}

/**
 * Manipula o evento de sair da área de arrastar
 */
function handleDragLeave(e) {
  e.preventDefault();
  e.stopPropagation();
  
  const photoPreview = document.getElementById('photoPreview');
  photoPreview.classList.remove('drag-over');
}

/**
 * Manipula o evento de soltar arquivo
 * Extrai a imagem do arquivo arrastado e a carrega
 */
function handleDrop(e) {
  e.preventDefault();
  e.stopPropagation();
  
  const photoPreview = document.getElementById('photoPreview');
  photoPreview.classList.remove('drag-over');
  
  // Obtém os arquivos arrastados
  const files = e.dataTransfer.files;
  
  if (files && files.length > 0) {
    // Processa apenas o primeiro arquivo
    const file = files[0];
    
    // Valida se é uma imagem
    if (!file.type.startsWith('image/')) {
      mostrarMensagem('Por favor, arraste apenas arquivos de imagem.', 'error');
      return;
    }
    
    // Valida o tamanho do arquivo (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      mostrarMensagem('O arquivo é muito grande. Máximo permitido: 5MB.', 'error');
      return;
    }
    
    // Cria um evento simulado para o input de arquivo
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    document.getElementById('photoInput').files = dataTransfer.files;
    
    // Carrega a foto
    carregarFoto({ target: { files: dataTransfer.files } });
    
    // Exibe mensagem de sucesso
    mostrarMensagem('Foto carregada com sucesso!', 'success');
  }
}
