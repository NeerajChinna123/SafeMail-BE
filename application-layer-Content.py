from joblib import load
import sys

# Load the models and vectorizers
random_forest = load('random_forest.pkl')
logistic_regression = load('logistic_regression.pkl')
naive_bayes = load('naive_bayes.pkl')
tfidf_vectorizer = load('tfidf_vectorizer.pkl')
count_vectorizer = load('count_vectorizer.pkl')

# Assuming `new_data` is your new input data in the same format as your training data
# new_data = sys.stdin.read().strip()
new_data = [sys.stdin.read().strip()]
# new_data = ['Account Suspension Request Access to&nbsp; <a href="mailto:recipient@berkeley.edu">recipient@berkeley.edu</a>(link sends e-mail)&nbsp; will be suspended as per</p><p>request received by admin&nbsp; at 5/12/2021 11:21:48 p.m.&nbsp; UTC.</p><p>&nbsp;</p><p>If you would like to cancel this request you may proceed below.</p><p>&nbsp;</p><p>*Cancel Now</p><p>&lt;hxxps://robichakraborty.com/the/update/XXXXXXX@security.berkeley.edu(link sends e-mail)&gt;*</p><p>&nbsp;</p><p>Best&nbsp; Regards,</p><p>&nbsp;</p><p><a href="http://security.berkeley.edu">security.berkeley.edu</a>&nbsp; Mail Center Helpdesk']
new_data_tfidf = tfidf_vectorizer.transform(new_data)
new_data_count = count_vectorizer.transform(new_data)

# Get probability predictions from each model
rf_probs = random_forest.predict_proba(new_data_tfidf)[:, 1]
lr_probs = logistic_regression.predict_proba(new_data_tfidf)[:, 1]
nb_probs = naive_bayes.predict_proba(new_data_count)[:, 1]

# Apply the ensemble logic (averaging the probabilities)
ensemble_probs = (rf_probs + lr_probs + nb_probs) / 3

# Convert probabilities to class labels based on a threshold
ensemble_preds = (ensemble_probs > 0.5).astype(int)

if(ensemble_preds == [1]):
    print('Phishing Email Content')
else:
    print('Legitimate Email Content')


# ensemble_preds is your final prediction
