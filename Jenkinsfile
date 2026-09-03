pipeline {
    agent any

    tools {
        nodejs 'node20'
    }

    environment {
        DOCKERHUB_NAMESPACE = 'hmsmiraz'
        // e.g. "dev" or "dev-42" — computed once, reused everywhere below.
        BRANCH_TAG = "${env.BRANCH_NAME}"
        BUILD_TAG_FULL = "${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
    }

    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '20'))
    }

    stages {
        stage('Frontend builds') {
            parallel {
                stage('landing') {
                    steps {
                        dir('apps/landing') {
                            sh 'npm install'
                            sh 'npm run build'
                        }
                    }
                }
                stage('admin') {
                    steps {
                        dir('apps/admin') {
                            sh 'npm install'
                            sh 'npm run build'
                        }
                    }
                }
                stage('learning-portal') {
                    steps {
                        dir('apps/learning-portal') {
                            sh 'npm install'
                            sh 'npm run build'
                        }
                    }
                }
            }
        }

        stage('Backend checks') {
            parallel {
                stage('auth-service') {
                    steps {
                        dir('services/auth-service') {
                            sh '''
                                python3 -m venv venv_ci
                                venv_ci/bin/pip install -q -r requirements.txt
                                venv_ci/bin/python3 -c "import app.main; print('auth-service: app.main imports cleanly')"
                            '''
                        }
                    }
                }
                stage('content-service') {
                    steps {
                        dir('services/content-service') {
                            sh '''
                                python3 -m venv venv_ci
                                venv_ci/bin/pip install -q -r requirements.txt
                                venv_ci/bin/python3 -c "import app.main; print('content-service: app.main imports cleanly')"
                            '''
                        }
                    }
                }
            }
        }

        stage('Docker image builds') {
            parallel {
                stage('auth-service image') {
                    steps {
                        sh '''
                            docker build \
                              -t ${DOCKERHUB_NAMESPACE}/techedu-auth-service:${BRANCH_TAG} \
                              -t ${DOCKERHUB_NAMESPACE}/techedu-auth-service:${BUILD_TAG_FULL} \
                              ./services/auth-service
                        '''
                    }
                }
                stage('content-service image') {
                    steps {
                        sh '''
                            docker build \
                              -t ${DOCKERHUB_NAMESPACE}/techedu-content-service:${BRANCH_TAG} \
                              -t ${DOCKERHUB_NAMESPACE}/techedu-content-service:${BUILD_TAG_FULL} \
                              ./services/content-service
                        '''
                    }
                }
                stage('gateway image') {
                    steps {
                        sh '''
                            docker build \
                              -t ${DOCKERHUB_NAMESPACE}/techedu-gateway:${BRANCH_TAG} \
                              -t ${DOCKERHUB_NAMESPACE}/techedu-gateway:${BUILD_TAG_FULL} \
                              ./services/gateway
                        '''
                    }
                }
                stage('landing image') {
                    steps {
                        sh '''
                            docker build \
                              -t ${DOCKERHUB_NAMESPACE}/techedu-landing:${BRANCH_TAG} \
                              -t ${DOCKERHUB_NAMESPACE}/techedu-landing:${BUILD_TAG_FULL} \
                              --build-arg NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api \
                              --build-arg NEXT_PUBLIC_LEARNING_PORTAL_URL=http://localhost:3002 \
                              ./apps/landing
                        '''
                    }
                }
                stage('admin image') {
                    steps {
                        sh '''
                            docker build \
                              -t ${DOCKERHUB_NAMESPACE}/techedu-admin:${BRANCH_TAG} \
                              -t ${DOCKERHUB_NAMESPACE}/techedu-admin:${BUILD_TAG_FULL} \
                              --build-arg NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api \
                              ./apps/admin
                        '''
                    }
                }
                stage('learning-portal image') {
                    steps {
                        sh '''
                            docker build \
                              -t ${DOCKERHUB_NAMESPACE}/techedu-learning-portal:${BRANCH_TAG} \
                              -t ${DOCKERHUB_NAMESPACE}/techedu-learning-portal:${BUILD_TAG_FULL} \
                              --build-arg NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api \
                              --build-arg NEXT_PUBLIC_LANDING_URL=http://localhost:3000 \
                              ./apps/learning-portal
                        '''
                    }
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

                        for image in techedu-auth-service techedu-content-service techedu-gateway techedu-landing techedu-admin techedu-learning-portal; do
                            docker push ${DOCKERHUB_NAMESPACE}/${image}:${BRANCH_TAG}
                            docker push ${DOCKERHUB_NAMESPACE}/${image}:${BUILD_TAG_FULL}
                        done

                        docker logout
                    '''
                }
            }
        }
    }

    post {
        always {
            echo "Branch: ${env.BRANCH_NAME} — Build #${env.BUILD_NUMBER} — Result: ${currentBuild.currentResult}"
            sh 'docker image prune -f || true'
        }
        success {
            echo "CI passed and images pushed for ${env.BRANCH_NAME}: tags ${env.BRANCH_TAG} and ${env.BUILD_TAG_FULL}. Deployment steps not configured yet — coming later."
        }
        failure {
            echo "CI failed on ${env.BRANCH_NAME} — check the stage logs above for which part broke."
        }
    }
}
