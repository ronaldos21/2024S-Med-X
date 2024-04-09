import cv2 as cv
import numpy as np

def get_finding(model, img_dir):
    img = cv.imread(img_dir, cv.IMREAD_GRAYSCALE)
    img = cv.cvtColor(img, cv.COLOR_GRAY2RGB)
    img = cv.resize(img, (224, 224), interpolation=cv.INTER_AREA)

    pred = model.predict(np.expand_dims(img, axis=0))[0]

    predictions = {
        'Atelectasis': {'probability': float(pred[0]), 'description': 'Partial or complete collapse of the lung'},
        'Cardiomegaly': {'probability': float(pred[1]), 'description': 'Enlargement of the heart'},
        'Consolidation': {'probability': float(pred[2]), 'description': 'Region of normally compressible lung tissue that has filled with liquid'},
        'Edema': {'probability': float(pred[3]), 'description': 'Excess fluid in the lungs'},
        'Enlarged Cardiomediastinum': {'probability': float(pred[4]), 'description': 'Enlargement of the heart and mediastinum'},
        'Fracture': {'probability': float(pred[5]), 'description': 'Break or crack in a bone'},
        'Lung Lesion': {'probability': float(pred[6]), 'description': 'Abnormality or growth in the lung tissue'},
        'Lung Opacity': {'probability': float(pred[7]), 'description': 'Opacity or abnormal appearance in lung tissue on imaging'},
        'No Finding': {'probability': float(pred[8]), 'description': 'No abnormality detected'},
        'Pleural Effusion': {'probability': float(pred[9]), 'description': 'Buildup of fluid in the pleural space'},
        'Pleural Other': {'probability': float(pred[10]), 'description': 'Other abnormalities in the pleura'},
        'Pneumonia': {'probability': float(pred[11]), 'description': 'Inflammation of the lung tissue usually due to infection'},
        'Pneumothorax': {'probability': float(pred[12]), 'description': 'Collection of air in the pleural space causing lung collapse'},
        'Support Devices': {'probability': float(pred[13]), 'description': 'Presence of medical devices supporting breathing or other functions'},
    }

    # Sort the predictions based on probability
    sorted_predictions = sorted(predictions.items(), key=lambda x: x[1]['probability'], reverse=True)

    # Extract the top two diagnoses
    top_diagnosis = sorted_predictions[0][0]
    second_diagnosis = sorted_predictions[1]

    return {'top_diagnosis': top_diagnosis, 'predictions': predictions}

