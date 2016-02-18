gulp dist
scp deploy-automatique.sh dist/automatique.zip pppdc9prd9vy.corp.intuit.net:
ssh -t pppdc9prd9vy.corp.intuit.net "./deploy-automatique.sh"
