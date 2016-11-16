const int RED = 7;
const int YELLOW = 8;
const int GREEN = 12;

void setLed(int pin) {
  digitalWrite(RED, LOW);
  digitalWrite(YELLOW, LOW);
  digitalWrite(GREEN, LOW);

  digitalWrite(pin, HIGH);
}

String readLine() {
  return Serial.readStringUntil('\n');
}

void setup() {
  Serial.begin(9600);
  pinMode(RED, OUTPUT);
  pinMode(YELLOW, OUTPUT);
  pinMode(GREEN, OUTPUT);
  
}

void loop() {
  while (Serial.available() > 0) {

  Serial.println("available()");
  
    String line = readLine();
    Serial.println(line);
    
    if (line != "") {
      if (line.equals("red")) {
        setLed(RED);
      } 
      
      else if (line.equals("yellow")) {
        setLed(YELLOW);
      } 
      
      else if (line.equals("green")) {
        setLed(GREEN);
      }
    }
  }
}

