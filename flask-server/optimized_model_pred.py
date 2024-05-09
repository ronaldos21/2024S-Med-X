import torch
from torchvision import transforms
from PIL import Image
from libauc.models import densenet121 as DenseNet121

thorax_diseases = ['Cardiomegaly', 'Edema', 'Consolidation', 'Atelectasis',  'Pleural Effusion',
                   'Enlarged Cardiomediastinum','Fracture', 'Lung Lesion', 'Lung Opacity' 'No Finding', 'Pleural Other',
                   'Pneumonia', 'Pneumothorax', 'Support Devices' ]

thorax_disease_description = {
      'Atelectasis': { 'description': 'The complete or partial collapse of a lung. It is caused by a blockage of the air passages or by compression of the lung.'},
      'Cardiomegaly': { 'description': 'Enlargement of the heart, where muscles of a chamber or the whole heart become abnormally thick or overly stretched. Can indicate various underlying conditions.'},
      'Consolidation': { 'description': 'The presence of material such as pus, blood, water, and cells in the small air sacs of the lungs.'},
      'Edema': { 'description': 'The buildup of fluid in the lungs. Can be associated with a heart disease or damage to lung tissue.'},
      'Enlarged Cardiomediastinum': { 'description': 'When the silhouette of the heart exceeds a normal diameter, indicating cardiomegaly.'},
      'Fracture': { 'description': 'A partial or complete break in a bone.'},
      'Lung Lesion': { 'description': 'An abnormal growth (nodule of ≤ 3 cm, mass of > 3 cm) that forms in a lung. Can be associated with infection, benign tumors, or malignancy.'},
      'Lung Opacity': { 'description': 'The presence of denser, cloudy gray areas on the x-ray image against a normal dark-appearing lung.  Gray areas indicate that something is occupying that area inside the lungs.'},
      'No Finding': { 'description': 'No abnormality detected.'},
      'Pleural Effusion': { 'description': 'The buildup of fluid within the pleural cavity located between the lung and chest lining. Can indicate an infection, malignancy, or inflammation.'},
      'Pleural Other': { 'description': 'Abnormality affecting the thin layers of tissue (pleura) that line the lungs and the chest cavity. It may be caused by viral infections, congestive heart failure, tuberculosis, or acute lung injury.'},
      'Pneumonia': { 'description': 'Inflammation of the lungs due to bacterial, viral, or fungal infection.The air sacs may fill with fluid or pus causing cough, fever, chills, and difficulty breathing.'},
      'Pneumothorax': {'description': 'A partially or fully collapsed lung due to pressure from accumulation of air within the pleural cavity between the lungs and chest wall. It may be caused by trauma, like a blow to the chest, lung disease, or occur spontaneously.'},
      'Support Devices': {'description': 'An implanted device that assists and improves a person’s functioning.'},
  }

def get_finding(model, image_path):
  image_tensor = prepare_image(image_path)
  probabilities = predict(model, image_tensor)
  max_idx = torch.argmax(probabilities[0])
  return {'top_diagnosis' : thorax_diseases[max_idx],
          'description': thorax_disease_description[thorax_diseases[max_idx]]['description']
          }

# Function to load the pretrained model
def load_model(model_path):
    model = DenseNet121(pretrained=False, last_activation=None, activations='relu', num_classes=5)
    model.load_state_dict(torch.load(model_path, map_location='cpu'))
    model.eval()  # Set the model to evaluation mode
    return model


def prepare_image(image_path):
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])
    image = Image.open(image_path).convert('RGB')
    image_tensor = transform(image).unsqueeze(0)  # Adding batch dimension
    return image_tensor


def predict(model, image_tensor):
    with torch.no_grad():  # Inference mode
        outputs = model(image_tensor)
        probabilities = torch.sigmoid(outputs)  # Applying sigmoid to get probabilities
    return probabilities