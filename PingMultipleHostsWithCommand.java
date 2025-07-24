import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class PingMultipleHostsWithCommand {
    public static void main(String[] args) {
        String[] hosts = {"google.com", "yahoo.com", "bing.com"};

        for (String host : hosts) {
            try {
                @SuppressWarnings("deprecation")
                Process process = Runtime.getRuntime().exec("ping " + host);
                BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
                String line;
                while ((line = reader.readLine()) != null) {
                    System.out.println(line);
                }
            } catch (IOException e) {
                System.err.println("Error pinging " + host + ": " + e.getMessage());
            }
        }
    }
}